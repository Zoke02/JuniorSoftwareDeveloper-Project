﻿using System;
using System.Collections.Generic;

namespace DreamPlants.DataService.API.Models.Generated;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
