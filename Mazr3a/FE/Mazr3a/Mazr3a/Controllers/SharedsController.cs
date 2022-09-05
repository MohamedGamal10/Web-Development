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
    public class SharedsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SharedsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Shareds
        public async Task<IActionResult> Index(int? pageNumber)
        {
            int pageSize = 5;
            return View(await PaginatedList<Shared>.CreateAsync(_context.Shareds.AsNoTracking(), pageNumber ?? 1, pageSize));
            //return View(await _context.Shareds.ToListAsync());
        }

        // GET: Shareds/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shared = await _context.Shareds
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shared == null)
            {
                return NotFound();
            }

            return View(shared);
        }

        // GET: Shareds/Create
        public IActionResult Create()
        {
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            return View();
        }

        // POST: Shareds/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Price,Farm_Name,Date")] Shared shared)
        {
            if (ModelState.IsValid)
            {
                _context.Add(shared);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            return View(shared);
        }

        // GET: Shareds/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shared = await _context.Shareds.FindAsync(id);
            if (shared == null)
            {
                return NotFound();
            }
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            return View(shared);
        }

        // POST: Shareds/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Price,Farm_Name,Date")] Shared shared)
        {
            if (id != shared.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(shared);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SharedExists(shared.Id))
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
            return View(shared);
        }

        // GET: Shareds/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shared = await _context.Shareds
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shared == null)
            {
                return NotFound();
            }

            return View(shared);
        }

        // POST: Shareds/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var shared = await _context.Shareds.FindAsync(id);
            _context.Shareds.Remove(shared);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SharedExists(int id)
        {
            return _context.Shareds.Any(e => e.Id == id);
        }
    }
}
