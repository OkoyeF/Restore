using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BaseApiController : ControllerBase
    {
        // This class can be used to add common functionality for all API controllers
        // For example, you can add logging, error handling, etc.
    }
}