using Microsoft.AspNetCore.Mvc;
using RegisterAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class RegisterController : ControllerBase
{
    [HttpPost]
    public IActionResult Register([FromBody] RegisterModel model)
    {
        // Handle registration logic here (e.g., save to database)
        return Ok("User registered successfully");
    }
}
