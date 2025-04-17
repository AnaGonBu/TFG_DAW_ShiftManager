package turnos.dto;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.CambioGrupo;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO que representa  cambio de turno")
public class CambioGrupoDto {

	@Schema(description = "ID del cambio", example = "1")
    private Integer idCambioGrupo;
	
	@Schema(description = "ID de solicitud", example = "1")
    private Integer idCambio;
	
	@Schema(description = "ID de empleado solicita", example = "1")
    private Integer idEmpleado;
	
	@Schema(description = "Fecha dia efectivo del cambio", example = "2022-01-15")
    private LocalDate fecha;
	
	@Schema(description = "ID grupo inicial fijo", example = "1")
    private Integer idGrupoOrigen;
	
	@Schema(description = "ID grupo temporal cambio", example = "2")
    private Integer idGrupoDestino;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static CambioGrupoDto mapFromEntity(CambioGrupo cambioGrupo) {
        return modelMapper.map(cambioGrupo, CambioGrupoDto.class);
    }

    public static CambioGrupo mapToEntity(CambioGrupoDto dto) {
        return modelMapper.map(dto, CambioGrupo.class);
    }


}
