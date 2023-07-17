using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

public class IPFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(HttpActionContext actionContext)
    {
        var request = actionContext.Request;
        var clientIP = GetClientIPAddress(request);

        if (!IsServerIP(clientIP))
        {
            actionContext.Response = request.CreateResponse(HttpStatusCode.Forbidden, "Acesso negado.");
            return;
        }

        base.OnActionExecuting(actionContext);
    }

    private string GetClientIPAddress(HttpRequestMessage request)
    {
        if (request.Properties.ContainsKey("MS_HttpContext"))
        {
            return ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
        }

        if (request.Properties.ContainsKey("System.ServiceModel.Channels.RemoteEndpointMessageProperty"))
        {
            var prop = (RemoteEndpointMessageProperty)request.Properties["System.ServiceModel.Channels.RemoteEndpointMessageProperty"];
            return prop.Address;
        }

        return null;
    }

    private bool IsServerIP(string ipAddress)
    {
        //Aqui ficará a lista de IPs que serão permitidos a entrada.
        //Os ips marcados são as representações dos IPs gerados localmente
        var serverIPs = new List<string> { "192.168.0.1", "127.0.0.1", "::1" };

        return serverIPs.Contains(ipAddress);
    }
}
