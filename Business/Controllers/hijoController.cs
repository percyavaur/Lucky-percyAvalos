using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Services;
using Entity.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Business.Controllers
{
    [Route("api/hijo")]
    [ApiController]
    public class hijoController : ControllerBase
    {
        HijoService hijoObj = new HijoService();

        // GET api/hijo
        [HttpGet]
        public IEnumerable<HijoModel> GetAllHijo()
        {
            return hijoObj.GetAllHijo();
        }

        // POST api/hijo
        [HttpPost]
        public int AddHijo([FromBody] HijoModel hijo)
        {
            return hijoObj.AddHijo(hijo);
        }

        // PUT api/hijo/{id}
        [HttpPut("{id}")]
        public int UpdateHijo(int id, [FromBody] HijoModel hijo)
        {
            return hijoObj.UpdateHijo(id, hijo);
        }

        // DELETE api/hijo/{id}
        [HttpDelete("{id}")]
        public int DeletePersonal(int id)
        {
            return hijoObj.DeleteHijo(id);
        }

        // GET api/hijo/byPersonal/{id}
        [HttpGet("byPersonal/{id}")]
        public IEnumerable<HijoModel> GetPersonalByFilter(int id)
        {
            return hijoObj.GetHijoByPersonal(id);
        }
    }
}
