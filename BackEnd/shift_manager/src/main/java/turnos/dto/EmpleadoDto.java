package turnos.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Empleado;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO que representa un empleado")
public class EmpleadoDto implements Serializable{


    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Schema(description = "ID del empleado", example = "1")
    private Integer idEmp;

    @Schema(description = "Nombre del empleado", example = "Juan")
    private String nombre;

    @Schema(description = "Apellidos del empleado", example = "Pérez Gómez")
    private String apellidos;

    @Schema(description = "Correo electrónico del empleado", example = "juan.perez@empresa.com")
    private String email;
    
    @Schema(description = "Contraseña del empleado", example = "contraseña123")
    private String password;
    
    @Schema(description = "Rol en la aplicación Admin/User", example = "User")
    private String rol;

    @Schema(description = "URL de la imagen del empleado", example = "https://miapp.com/imagenes/juan.jpg")
    private String imagen;

    @Schema(description = "Domicilio del empleado", example = "Calle Falsa 123, Madrid")
    private String domicilio;

    @Schema(description = "Fecha de ingreso a la empresa", example = "2022-01-15")
    private LocalDate fechaIngreso;

    @Schema(description = "Fecha de nacimiento del empleado", example = "1990-05-20")
    private LocalDate fechaNacimiento;

    @Schema(description = "Situación laboral del empleado", example = "Activo")
    private String situacion;

    @Schema(description = "Estado actual del empleado, false no eliminados", example = "true")
    private Boolean estado;

    @Schema(description = "ID del grupo al que pertenece el empleado", example = "3")
    private Integer idGrupo;
    
    private static final ModelMapper modelMapper = new ModelMapper();


    public static EmpleadoDto mapFromEntity(Empleado empleado) {
        EmpleadoDto dto = modelMapper.map(empleado, EmpleadoDto.class);
        if (empleado.getGrupo() != null) {
            dto.setIdGrupo(empleado.getGrupo().getIdGrupo());
        }
        return dto;
    }

    public static Empleado mapToEntity(EmpleadoDto dto) {
        return modelMapper.map(dto, Empleado.class);
    }
    




}

