package turnos.dto;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Cambios;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CambiosDto {

    private Integer idCambio;
    private Integer idSolicitante;
    private Integer idConcede;
    private LocalDate fechaSolicitud;
    private LocalDate fechaTurno1;
    private LocalDate fechaTurno2;
    private String estado;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static CambiosDto mapFromEntity(Cambios cambios) {
        return modelMapper.map(cambios, CambiosDto.class);
    }

    public static Cambios mapToEntity(CambiosDto dto) {
        return modelMapper.map(dto, Cambios.class);
    }


}
