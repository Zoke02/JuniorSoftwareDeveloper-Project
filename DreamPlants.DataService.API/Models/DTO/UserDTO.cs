﻿namespace DreamPlants.DataService.API.Models.DTO
{
  // Aparently it is good practice whhn you get the data to make a DATA-TRANSFER-OBJECT. Industry standard?
  public class UserDTO
  {
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string? NewPassword { get; set; }

    public int RoleId { get; set; }

    public string AvatarBase64 { get; set; }

    public string AvatarFileType { get; set; }
  }

  public class UpdateUserAdminDTO
  {
    public int UserId { get; set; }
    public int RoleId { get; set; }
    public bool UserStatus { get; set; }
  }

}
