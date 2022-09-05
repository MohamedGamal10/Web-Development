#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Mazr3a.Data;
using Mazr3a.Models;

namespace Mazr3a.Controllers
{
    public class DailyController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DailyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Daily
        public async Task<IActionResult> Index(int? pageNumber)
        {
            int pageSize = 3;
            return View(await PaginatedList<Daily>.CreateAsync(_context.Dailies.AsNoTracking(), pageNumber ?? 1, pageSize));

            //return View(await _context.Dailies.ToListAsync());
        }

        // GET: Daily/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var daily = await _context.Dailies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (daily == null)
            {
                return NotFound();
            }

            return View(daily);
        }

        // GET: Daily/Create
        public IActionResult Create()
        {
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();
            ViewBag.Activity_Name = _context.Items.Select(u => u.Activity_Name).ToList();
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();
            return View();
        }

        // POST: Daily/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Farm_Name,Sector_ID,Date,Activity_Name,Workers,Unit_Rate,Workers_Rate,Material_Name,Quantity,Store_Name,Price,Material_Total,Total")] Daily daily)
        {
            if (ModelState.IsValid)
            {
                daily.Workers_Rate = float.Parse( daily.Workers.ToString()) * float.Parse(daily.Unit_Rate.ToString());
                daily.Material_Total = float.Parse(daily.Quantity.ToString()) * float.Parse(daily.Price.ToString());
                daily.Total = float.Parse(daily.Workers_Rate.ToString()) + float.Parse(daily.Material_Total.ToString());
                _context.Add(daily);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();
            ViewBag.Activity_Name = _context.Items.Select(u => u.Activity_Name).ToList();
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();
            return View(daily);
        }

        // GET: Daily/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var daily = await _context.Dailies.FindAsync(id);
            if (daily == null)
            {
                return NotFound();
            }
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            //ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();
            ViewBag.Activity_Name = _context.Items.Select(u => u.Activity_Name).ToList();
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();
            return View(daily);
        }

        // POST: Daily/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Farm_Name,Sector_ID,Date,Activity_Name,Workers,Unit_Rate,Workers_Rate,Material_Name,Quantity,Store_Name,Price,Material_Total,Total")] Daily daily)
        {
            if (id != daily.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    daily.Workers_Rate = float.Parse(daily.Workers.ToString()) * float.Parse(daily.Unit_Rate.ToString());
                    daily.Material_Total = float.Parse(daily.Quantity.ToString()) * float.Parse(daily.Price.ToString());
                    daily.Total = float.Parse(daily.Workers_Rate.ToString()) + float.Parse(daily.Material_Total.ToString());
                    _context.Update(daily);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DailyExists(daily.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();
            ViewBag.Activity_Name = _context.Items.Select(u => u.Activity_Name).ToList();
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();
            return View(daily);
        }

        // GET: Daily/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var daily = await _context.Dailies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (daily == null)
            {
                return NotFound();
            }

            return View(daily);
        }

        // POST: Daily/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var daily = await _context.Dailies.FindAsync(id);
            _context.Dailies.Remove(daily);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DailyExists(int id)
        {
            return _context.Dailies.Any(e => e.Id == id);
        }

    }

}
