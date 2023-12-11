namespace cs50_final_project_api.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Discount { get; set; } = 0;
    }
}
