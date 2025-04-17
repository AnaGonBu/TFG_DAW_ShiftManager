package turnos.configuracion;


import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import turnos.dto.CambioGrupoDto;
import turnos.dto.CambiosDto;
import turnos.dto.EmpleadoDto;
import turnos.entity.CambioGrupo;
import turnos.entity.Cambios;
import turnos.entity.Empleado;


@Configuration
public class SpingConfig {

    @Bean
    ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Mapeo de CambioGrupo a CambioGrupoDto con solo los IDs de las entidades relacionadas
        TypeMap<CambioGrupo, CambioGrupoDto> cambioGrupoMap = modelMapper.createTypeMap(CambioGrupo.class, CambioGrupoDto.class);
        cambioGrupoMap.addMappings(mapper -> {
            // Mapeo de los IDs de las entidades relacionadas
            mapper.map(src -> src.getCambio().getIdCambio(), CambioGrupoDto::setIdCambio);
            mapper.map(src -> src.getEmpleado().getIdEmp(), CambioGrupoDto::setIdEmpleado);
            mapper.map(src -> src.getGrupoOrigen() != null ? src.getGrupoOrigen().getIdGrupo() : null, CambioGrupoDto::setIdGrupoOrigen);
            mapper.map(src -> src.getGrupoDestino() != null ? src.getGrupoDestino().getIdGrupo() : null, CambioGrupoDto::setIdGrupoDestino);
        });

        // Mapeo de Empleado a EmpleadoDto con solo los IDs de las entidades relacionadas
        TypeMap<Empleado, EmpleadoDto> empleadoMap = modelMapper.createTypeMap(Empleado.class, EmpleadoDto.class);
        empleadoMap.addMappings(mapper -> {
            mapper.map(Empleado::getIdEmp, EmpleadoDto::setIdEmp);
            mapper.map(Empleado::getNombre, EmpleadoDto::setNombre);
            mapper.map(Empleado::getApellidos, EmpleadoDto::setApellidos);
            mapper.map(Empleado::getSituacion, EmpleadoDto::setSituacion);
            mapper.map(Empleado::getEstado, EmpleadoDto::setEstado);
            
            
        });

        // --- DTO -> ENTIDAD: CambiosDto → Cambios
        Converter<Integer, Empleado> idToEmpleadoConverter = ctx -> {
            Integer id = ctx.getSource();
            return id != null ? Empleado.builder().idEmp(id).build() : null;
        };

        TypeMap<CambiosDto, Cambios> dtoToEntity = modelMapper.createTypeMap(CambiosDto.class, Cambios.class);
        dtoToEntity.addMappings(mapper -> {
            mapper.using(idToEmpleadoConverter).map(CambiosDto::getIdSolicitante, Cambios::setIdSolicitante);
            mapper.using(idToEmpleadoConverter).map(CambiosDto::getIdConcede, Cambios::setIdConcede);
        });

        // --- ENTIDAD -> DTO: Cambios → CambiosDto
        TypeMap<Cambios, CambiosDto> entityToDto = modelMapper.createTypeMap(Cambios.class, CambiosDto.class);
        entityToDto.addMappings(mapper -> {
            mapper.map(src -> src.getIdSolicitante() != null ? src.getIdSolicitante().getIdEmp() : null,
                       CambiosDto::setIdSolicitante);
            mapper.map(src -> src.getIdConcede() != null ? src.getIdConcede().getIdEmp() : null,
                       CambiosDto::setIdConcede);
        });

        return modelMapper;
    }
}
