using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;


namespace api.database
{
    public class Database
    {
        
        private string host { get; set;}

        private string database { get; set;}

        private string username { get; set;}

        private string port { get; set;}

        private string password { get; set;}

        public string cs { get; set;}

        public Database()
        {
            host= "i0rgccmrx3at3wv3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            database="nht8eecjsuh9h0jw";
            username="xfr164u7pr06vsrd";
            port="3306";
            password="hfr5c9l3hrf2kpzv";

           cs= $"server={host};user={username};database={database};port={port}; password={password}";

        }
    
    }
}