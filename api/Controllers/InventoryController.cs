using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models; 

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        // GET: api/Inventory
        [HttpGet]
        public List<Inventory> Get()
        {
            List<Inventory> inventory = InventoryUtility.GetInventory();
            return inventory;
        }

        [HttpGet("{id}", Name = "Get")]
        public Inventory Get(int id)
        {
            Inventory newInventory= InventoryUtility.GetInventoryById(id);
            return newInventory;
        }

        // POST: api/Inventory
        [HttpPost]
        public void Post([FromBody] Inventory inventory)
        {
            InventoryUtility.AddInventory(inventory);
        }

        // PUT: api/Inventory/5
        [HttpPut("{id}")]
        public void Put(int id)
        {
            InventoryUtility.HoldInventory(id);
        }

        // DELETE: api/Inventory/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            InventoryUtility.DeleteInventory(id);
        }
    }
}