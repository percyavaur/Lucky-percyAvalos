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
    [Route("api/personal")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        PersonalService personalObj = new PersonalService();

        // GET: api/personal
        [HttpGet]
        public IEnumerable<PersonalModel> GetAllPersonal()
        {
            return personalObj.GetAllPersonal();
        }

        // POST api/personal
        [HttpPost]
        public int AddPersonal([FromBody] PersonalModel personal)
        {
            return personalObj.AddPersonal(personal);
        }

        // PUT api/personal/5
        [HttpPut("{id}")]
        public int UpdatePersonal(int id, [FromBody] PersonalModel personal)
        {
            return personalObj.UpdatePersonal(id, personal);
        }

        // DELETE api/personal/5
        [HttpDelete("{id}")]
        public int DeletePersonal(int id)
        {
            return personalObj.DeletePersonal(id);
        }

        [HttpPost("filter")]
        public IEnumerable<PersonalModel> GetPersonalByFilter([FromBody] PersonalModel personal)
        {
            return personalObj.GetPersonalByFilter(personal);
        }
    }
}
