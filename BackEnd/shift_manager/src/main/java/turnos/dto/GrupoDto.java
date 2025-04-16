package turnos.dto;


import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Grupo;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrupoDto {

    private Integer idGrupo;
    private String nombreGrupo;
    private Integer numEmp;
    private String descripcion;
    private Boolean estado;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static GrupoDto mapFromEntity(Grupo grupo) {
        return modelMapper.map(grupo, GrupoDto.class);
    }

    public static Grupo mapToEntity(GrupoDto dto) {
        return modelMapper.map(dto, Grupo.class);
    }


}

