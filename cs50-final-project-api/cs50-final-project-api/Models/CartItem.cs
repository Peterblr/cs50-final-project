﻿namespace cs50_final_project_api.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        public Product Product { get; set; } = new Product();
    }
}
