package turnos.dto;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.CambioGrupo;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CambioGrupoDto {

    private Integer idCambioGrupo;
    private Integer idCambio;
    private Integer idEmpleado;
    private LocalDate fecha;
    private Integer idGrupoOrigen;
    private Integer idGrupoDestino;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static CambioGrupoDto mapFromEntity(CambioGrupo cambioGrupo) {
        return modelMapper.map(cambioGrupo, CambioGrupoDto.class);
    }

    public static CambioGrupo mapToEntity(CambioGrupoDto dto) {
        return modelMapper.map(dto, CambioGrupo.class);
    }


}
