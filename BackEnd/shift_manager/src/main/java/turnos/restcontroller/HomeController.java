/*
package turnos.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import jakarta.servlet.http.HttpSession;
import turnos.entity.Empleado;
import turnos.service.EmpleadoService;

@Controller
public class HomeController {
	
	@Autowired
	private EmpleadoService eService;
	
	@GetMapping({"","/","/home"})
	public String home() {
		

		return "login";
	}
	
    @GetMapping("/login")
    public String inicioSesion(Authentication authentication, HttpSession session) {
        // Obtener el usuario autenticado
    	Empleado empleado = (Empleado) authentication.getPrincipal();
        session.setAttribute("empleado", empleado);

        if (empleado.getRol().equals("ADMIN")) {
            return "api/home";
        } else {
            return "api/cambios";
        }
    }

}*/
