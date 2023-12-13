namespace api.models
{
    public class Inventory
    {
    
        public int carID {get;set;}

        public string carMake {get;set;}

        public string carModel {get;set;}

        public int carMileage {get;set;}

        public DateTime dateEntered {get;set;}

        public bool onHold {get; set;} 

        public bool isDeleted {get; set;} 

    }
    
}