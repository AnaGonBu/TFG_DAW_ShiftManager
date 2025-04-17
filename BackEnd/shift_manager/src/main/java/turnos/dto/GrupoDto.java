package turnos.dto;


import org.modelmapper.ModelMapper;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import turnos.entity.Grupo;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO que representa un turno")
public class GrupoDto {

	@Schema(description = "ID del turno", example = "1")
    private Integer idGrupo;
	
	@Schema(description = "Nombre del turno", example = "1")
    private String nombreGrupo;
	
	@Schema(description = "Numero empleados que incluye", example = "1")
    private Integer numEmp;
	
	@Schema(description = "Descripcion turno", example = "1")
    private String descripcion;
	
	@Schema(description = "Estado del turno", example = "1")
    private Boolean estado;
    
    private static final ModelMapper modelMapper = new ModelMapper();

    public static GrupoDto mapFromEntity(Grupo grupo) {
        return modelMapper.map(grupo, GrupoDto.class);
    }

    public static Grupo mapToEntity(GrupoDto dto) {
        return modelMapper.map(dto, Grupo.class);
    }


}

