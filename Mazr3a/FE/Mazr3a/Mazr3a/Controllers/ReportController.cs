using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Mazr3a.Data;
using Mazr3a.Models;
using System.Collections.Generic;
using System.Linq;

namespace Mazr3a.Controllers
{
    public class ReportController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReportController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Report()
        {
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();
            return View();
        }

        public async Task<IActionResult> Sector_Report(string mazr3a, string sector, string from, string to)
        {
            //Data
            ViewBag.mazr3a = mazr3a;
            ViewBag.sector = sector;
            DateTime dateTimefrom = DateTime.Parse(from);
            DateTime dateTimeto = DateTime.Parse(to);
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            ViewBag.Sector_ID = _context.Sectors.Select(u => u.Sector_ID).ToList().Distinct();

            //Report
            ViewBag.R = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Sector_ID == int.Parse(sector) && x.Date >= dateTimefrom && x.Date <= dateTimeto select x;

            //Total Workers And Materials
            var Total_Workers = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Sector_ID == int.Parse(sector) && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Workers_Rate;
            ViewBag.Total_Workers = Total_Workers.Sum();

            var Total_Material = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Sector_ID == int.Parse(sector) && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Material_Total;
            ViewBag.Total_Material = Total_Material.Sum();

            //Total Shareds
            var Total_Sectors = from x in _context.Sectors where x.Farm_Name == mazr3a select x.Sector_ID;
            var Total_Shareds = from x in _context.Shareds where x.Farm_Name == mazr3a && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Price;
            var Shareds = Total_Shareds.Sum() / Total_Sectors.Count();
            ViewBag.Shareds = Shareds;

            //Total
            ViewBag.Total = Total_Workers.Sum() + Total_Material.Sum() + Shareds;

            //Shareds
            ViewBag.View_Shareds = from x in _context.Shareds where x.Farm_Name == mazr3a && x.Date >= dateTimefrom && x.Date <= dateTimeto select x;

            return View();

        }

        public IActionResult Store()
        {
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();
            return View();
        }
        public async Task<IActionResult> Store_Report(string store, string material, string from, string to)
        {
            //Data
            DateTime dateTimefrom = DateTime.Parse(from);
            DateTime dateTimeto = DateTime.Parse(to);
            ViewBag.store = store;
            ViewBag.material = material;
            ViewBag.Material_Name = _context.Materials.Select(u => u.Material_Name).ToList();
            ViewBag.Store_Name = _context.Stores.Select(u => u.Store_Name).ToList();

            //Report
            var material_total_daily = from x in _context.Dailies where x.Store_Name == store && x.Material_Name == material && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Quantity;
            var material_total_Stocks = from x in _context.Stocks where x.Store_Name == store && x.Material_Name == material && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Quantity;
            ViewBag.material_total_daily = material_total_daily.Sum();
            ViewBag.material_total_Stocks = material_total_Stocks.Sum();
            ViewBag.material_total_Quantity = material_total_Stocks.Sum() - material_total_daily.Sum();

            ViewBag.material_total_daily_view = from x in _context.Dailies where x.Store_Name == store && x.Material_Name == material && x.Date >= dateTimefrom && x.Date <= dateTimeto select x;
            ViewBag.material_total_Stocks_view = from x in _context.Stocks where x.Store_Name == store && x.Material_Name == material && x.Date >= dateTimefrom && x.Date <= dateTimeto select x;
            return View();

        }
        public IActionResult Full()
        {
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();
            return View();
        }

        public async Task<IActionResult> Full_Report(string mazr3a, string from, string to)
        {
            //Data
            DateTime dateTimefrom = DateTime.Parse(from);
            DateTime dateTimeto = DateTime.Parse(to);
            ViewBag.mazr3a = mazr3a;
            ViewBag.Farm_Name = _context.Sectors.Select(u => u.Farm_Name).ToList().Distinct();

            //Report
            var Total_Workers = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Workers_Rate;
            ViewBag.Total_Workers = Total_Workers.Sum();

            var Total_Material = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Material_Total;
            ViewBag.Total_Material = Total_Material.Sum();

            var Total = from x in _context.Dailies where x.Farm_Name == mazr3a && x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Total;
            ViewBag.Total = Total.Sum();

            return View();

        }

        public IActionResult Cash ()
        {
            return View();
        }

        public async Task<IActionResult> Cash_Report(string from, string to)
        {
            //Data
            DateTime dateTimefrom = DateTime.Parse(from);
            DateTime dateTimeto = DateTime.Parse(to);

            //Report
            ViewBag.Cash = from x in _context.Cashes where x.Date >= dateTimefrom && x.Date <= dateTimeto select x;

            var Cash = from x in _context.Cashes where x.Date >= dateTimefrom && x.Date <= dateTimeto select x.Price;
            ViewBag.Total = Cash.Sum();
            return View();

        }

    }
}

