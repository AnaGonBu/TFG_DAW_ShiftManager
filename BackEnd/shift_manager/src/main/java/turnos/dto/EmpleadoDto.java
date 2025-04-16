package turnos.dto;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Empleado;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmpleadoDto {

    private Integer idEmp;
    private String nombre;
    private String apellidos;
    private String email;
    private String imagen;
    private String domicilio;
    private LocalDate fechaIngreso;
    private LocalDate fechaNacimiento;
    private String situacion;
    private Boolean estado;
    private Integer idGrupo;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static EmpleadoDto mapFromEntity(Empleado empleado) {
        return modelMapper.map(empleado, EmpleadoDto.class);
    }

    public static Empleado mapToEntity(EmpleadoDto dto) {
        return modelMapper.map(dto, Empleado.class);
    }
    




}

