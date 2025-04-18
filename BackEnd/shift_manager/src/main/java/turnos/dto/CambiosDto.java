package turnos.dto;
import java.io.Serializable;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Cambios;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO que representa solicitudes de cambios")
public class CambiosDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Schema(description = "ID de cambio", example = "1")
	private Integer idCambio;
	
	@Schema(description = "ID del empleado solicita cambio", example = "1")
    private Integer idSolicitante;
	
	@Schema(description = "ID del empleado solicita cambio2", example = "2")
    private Integer idConcede;
	
	@Schema(description = "Fecha solicitud", example = "2022-01-13")
    private LocalDate fechaSolicitud;
	
	@Schema(description = "IFecha turno a cambiar1", example = "2022-01-15")
    private LocalDate fechaTurno1;
	
	@Schema(description = "IFecha turno a cambiar2", example = "2022-01-18")
    private LocalDate fechaTurno2;
	
	@Schema(description = "Estado solicitud", example = "PENDIENTE")
    private String estado;
	
	
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static CambiosDto mapFromEntity(Cambios cambios) {
        return modelMapper.map(cambios, CambiosDto.class);
    }

    public static Cambios mapToEntity(CambiosDto dto) {
        return modelMapper.map(dto, Cambios.class);
    }


}
