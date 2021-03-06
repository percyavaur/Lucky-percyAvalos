using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Entity.Models;

namespace Data.Services
{
    public class PersonalService
    {
        string connectionString = "Data Source=NITRO-5-PJAU;Database=percyAvalos; Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        public IEnumerable<PersonalModel> GetAllPersonal()
        {
            try
            {
                List<PersonalModel> listPersonal = new List<PersonalModel>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllPersonal", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        PersonalModel personal = new PersonalModel();

                        personal.IdPersonal = Convert.ToInt32(rdr["IdPersonal"]);
                        personal.ApPaterno = rdr["ApPaterno"].ToString();
                        personal.ApMaterno = rdr["ApMaterno"].ToString();
                        personal.Nombre1 = rdr["Nombre1"].ToString();
                        personal.Nombre2 = rdr["Nombre2"].ToString();
                        personal.NombreCompleto = rdr["NombreCompleto"].ToString();
                        personal.FchNac = Convert.ToDateTime(rdr["FchNac"]);
                        personal.FchIngreso = Convert.ToDateTime(rdr["FchIngreso"]);

                        listPersonal.Add(personal);
                    }
                    con.Close();
                }
                return listPersonal;
            }
            catch
            {
                throw;
            }
        }
        public int AddPersonal(PersonalModel personal)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddPersonal", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ApPaterno", personal.ApPaterno);
                    cmd.Parameters.AddWithValue("@ApMaterno", personal.ApMaterno);
                    cmd.Parameters.AddWithValue("@Nombre1", personal.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", personal.Nombre2);
                    cmd.Parameters.AddWithValue("@FchNac", personal.FchNac);
                    cmd.Parameters.AddWithValue("@FchIngreso", personal.FchIngreso);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdatePersonal(int id, PersonalModel personal)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdatePersonal", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdPersonal", id);
                    cmd.Parameters.AddWithValue("@ApPaterno", personal.ApPaterno);
                    cmd.Parameters.AddWithValue("@ApMaterno", personal.ApMaterno);
                    cmd.Parameters.AddWithValue("@Nombre1", personal.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", personal.Nombre2);
                    cmd.Parameters.AddWithValue("@FchNac", personal.FchNac);
                    cmd.Parameters.AddWithValue("@FchIngreso", personal.FchIngreso);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int DeletePersonal(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeletePersonal", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdPersonal", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<PersonalModel> GetPersonalByFilter(PersonalModel personalFilter)
        {
            try
            {
                List<PersonalModel> listPersonal = new List<PersonalModel>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetPersonalByFilter", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Nombre1", personalFilter.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", personalFilter.Nombre2);
                    cmd.Parameters.AddWithValue("@ApPaterno", personalFilter.ApPaterno);
                    cmd.Parameters.AddWithValue("@ApMaterno", personalFilter.ApMaterno);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        PersonalModel personal = new PersonalModel();

                        personal.IdPersonal = Convert.ToInt32(rdr["IdPersonal"]);
                        personal.ApPaterno = rdr["ApPaterno"].ToString();
                        personal.ApMaterno = rdr["ApMaterno"].ToString();
                        personal.Nombre1 = rdr["Nombre1"].ToString();
                        personal.Nombre2 = rdr["Nombre2"].ToString();
                        personal.NombreCompleto = rdr["NombreCompleto"].ToString();
                        personal.FchNac = Convert.ToDateTime(rdr["FchNac"]);
                        personal.FchIngreso = Convert.ToDateTime(rdr["FchIngreso"]);

                        listPersonal.Add(personal);
                    }
                    con.Close();
                }
                return listPersonal;
            }
            catch
            {
                throw;
            }
        }
    }
}
