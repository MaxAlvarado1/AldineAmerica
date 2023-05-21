using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Data;
using System.Net;
using System.Data.SqlClient;
using America.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing.Constraints;

namespace AmericaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public InventoryController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AmericaInventory");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("aldineam_user.getInventory", myCon))
                {
                    myCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(inventory inventory)
        {
            try
            {
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("AmericaInventory");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand("aldineam_user.addInventory", myCon))
                    {
                        myCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@carMake", inventory.carMake);
                        myCommand.Parameters.AddWithValue("@carModel", inventory.carModel);
                        myCommand.Parameters.AddWithValue("@carPartName", inventory.carPartName);
                        myCommand.Parameters.AddWithValue("@carYear", inventory.carYear);
                        myCommand.Parameters.AddWithValue("@carPartType", inventory.carPartType);
                        myCommand.Parameters.AddWithValue("@carImage1", inventory.carImage1);
                        myCommand.Parameters.AddWithValue("@carImage2", inventory.carImage2);
                        myCommand.Parameters.AddWithValue("@carImage3", inventory.carImage3);
                        myCommand.Parameters.AddWithValue("@carImage4", inventory.carImage4);
                        myCommand.Parameters.AddWithValue("@carImage5", inventory.carImage5);
                        myCommand.Parameters.AddWithValue("@carImage6", inventory.carImage6);
                        myCommand.Parameters.AddWithValue("@carImage7", inventory.carImage7);
                        myCommand.Parameters.AddWithValue("@carImage8", inventory.carImage8);
                        myCommand.Parameters.AddWithValue("@carImage9", inventory.carImage9);
                        myCommand.Parameters.AddWithValue("@carImage10", inventory.carImage10);
                        myCommand.Parameters.AddWithValue("@carDesc", inventory.carDesc);
                        myCommand.Parameters.AddWithValue("@spotlight", inventory.spotlight);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult("Added Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }
           
        }

        [HttpPut]
        public JsonResult Put(inventory inventory)
        {
            try
            {
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("AmericaInventory");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand("aldineam_user.updateInventory", myCon))
                    {
                        myCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@ID", inventory.ID);
                        myCommand.Parameters.AddWithValue("@carMake", inventory.carMake);
                        myCommand.Parameters.AddWithValue("@carModel", inventory.carModel);
                        myCommand.Parameters.AddWithValue("@carYear", inventory.carYear);
                        myCommand.Parameters.AddWithValue("@carPartName", inventory.carPartName);
                        myCommand.Parameters.AddWithValue("@carPartType", inventory.carPartType);
                        myCommand.Parameters.AddWithValue("@carImageDate", inventory.carImageDate);
                        myCommand.Parameters.AddWithValue("@carImage1", inventory.carImage1);
                        myCommand.Parameters.AddWithValue("@carImage2", inventory.carImage2);
                        myCommand.Parameters.AddWithValue("@carImage3", inventory.carImage3);
                        myCommand.Parameters.AddWithValue("@carImage4", inventory.carImage4);
                        myCommand.Parameters.AddWithValue("@carImage5", inventory.carImage5);
                        myCommand.Parameters.AddWithValue("@carImage6", inventory.carImage6);
                        myCommand.Parameters.AddWithValue("@carImage7", inventory.carImage7);
                        myCommand.Parameters.AddWithValue("@carImage8", inventory.carImage8);
                        myCommand.Parameters.AddWithValue("@carImage9", inventory.carImage9);
                        myCommand.Parameters.AddWithValue("@carImage10", inventory.carImage10);
                        myCommand.Parameters.AddWithValue("@carDesc", inventory.carDesc);
                        myCommand.Parameters.AddWithValue("@spotlight", inventory.spotlight);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult("Updated Successfully");
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }
        }

        [HttpDelete("{ID}")]
        public JsonResult Delete(int ID)
        {
            try
            {
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("AmericaInventory");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand("aldineam_user.deleteInventory", myCon))
                    {
                        myCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@ID", ID);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult("Deleted Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "\\SaveFile\\" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception e) 
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "\\SaveFile\\" + filename;
                return new JsonResult(e.Message);
            }
        }

    }
}
