using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Entity.Models;

namespace Data.Services
{
    public class HijoService
    {
        string connectionString = "Data Source=NITRO-5-PJAU;Database=percyAvalos; Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public IEnumerable<HijoModel> GetAllHijo()
        {
            try
            {
                List<HijoModel> listHijo = new List<HijoModel>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllHijo", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        HijoModel hijo = new HijoModel();

                        hijo.IdDerhab = Convert.ToInt32(rdr["IdDerhab"]);
                        hijo.IdPersonal = Convert.ToInt32(rdr["IdPersonal"]);
                        hijo.ApPaterno = rdr["ApPaterno"].ToString();
                        hijo.ApMaterno = rdr["ApMaterno"].ToString();
                        hijo.Nombre1 = rdr["Nombre1"].ToString();
                        hijo.Nombre2 = rdr["Nombre2"].ToString();
                        hijo.NombreCompleto = rdr["NombreCompleto"].ToString();
                        hijo.FchNac = Convert.ToDateTime(rdr["FechNac"]);

                        listHijo.Add(hijo);
                    }
                    con.Close();
                }
                return listHijo;
            }
            catch
            {
                throw;
            }
        }
        public int AddHijo(HijoModel hijo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddHijo", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdPersonal", hijo.IdPersonal);
                    cmd.Parameters.AddWithValue("@ApPaterno", hijo.ApPaterno);
                    cmd.Parameters.AddWithValue("@ApMaterno", hijo.ApMaterno);
                    cmd.Parameters.AddWithValue("@Nombre1", hijo.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", hijo.Nombre2);
                    cmd.Parameters.AddWithValue("@FchNac", hijo.FchNac);

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

        public int UpdateHijo(int IdDerhab,HijoModel hijo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateHijo", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdDerhab", IdDerhab);
                    cmd.Parameters.AddWithValue("@IdPersonal", hijo.IdPersonal);
                    cmd.Parameters.AddWithValue("@ApPaterno", hijo.ApPaterno);
                    cmd.Parameters.AddWithValue("@ApMaterno", hijo.ApMaterno);
                    cmd.Parameters.AddWithValue("@Nombre1", hijo.Nombre1);
                    cmd.Parameters.AddWithValue("@Nombre2", hijo.Nombre2);
                    cmd.Parameters.AddWithValue("@FchNac", hijo.FchNac);

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
        public int DeleteHijo(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteHijo", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdDerhab", id);

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

        public IEnumerable<HijoModel> GetHijoByPersonal(int IdPersonal)
        {
            try
            {
                List<HijoModel> listHijo = new List<HijoModel>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetHijoByPersonal", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdPersonal", IdPersonal);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        HijoModel hijo = new HijoModel();

                        hijo.IdDerhab = Convert.ToInt32(rdr["IdDerhab"]);
                        hijo.IdPersonal = Convert.ToInt32(rdr["IdPersonal"]);
                        hijo.ApPaterno = rdr["ApPaterno"].ToString();
                        hijo.ApMaterno = rdr["ApMaterno"].ToString();
                        hijo.Nombre1 = rdr["Nombre1"].ToString();
                        hijo.Nombre2 = rdr["Nombre2"].ToString();
                        hijo.NombreCompleto = rdr["NombreCompleto"].ToString();
                        hijo.FchNac = Convert.ToDateTime(rdr["FchNac"]);

                        listHijo.Add(hijo);
                    }
                    con.Close();
                }
                return listHijo;
            }
            catch
            {
                throw;
            }
        }
    }
}
