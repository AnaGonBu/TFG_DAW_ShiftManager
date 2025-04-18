package turnos.configuracion;


import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import turnos.dto.CambioGrupoDto;
import turnos.dto.CambiosDto;
import turnos.dto.EmpleadoDto;
import turnos.entity.CambioGrupo;
import turnos.entity.Cambios;
import turnos.entity.Empleado;
import turnos.entity.Estado;


@Configuration
public class SpingConfig {

    @Bean
    ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
        .setMatchingStrategy(MatchingStrategies.STANDARD)
        .setFieldMatchingEnabled(true)
        .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

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

        // String (Enum Name) <-> Estado Enum
        Converter<String, Estado> stringToEstado = new AbstractConverter<>() {
            @Override
            protected Estado convert(String source) {
                if (source == null) {
                    return null;
                }
                try {
                    
                    return Estado.valueOf(source.toUpperCase());
                } catch (IllegalArgumentException e) {
                    // Considera cómo manejar un valor de estado inválido
                    System.err.println("Valor de Estado inválido recibido: " + source);
                   
                    return null; 
                }
            }
        };

        Converter<Estado, String> estadoToString = new AbstractConverter<>() {
            @Override
            protected String convert(Estado source) {
                // Es más seguro usar name() para obtener el nombre del enum como String
                return source != null ? source.name() : null;
            }
        };

        // --- Mapeo: CambiosDto -> Cambios (Como antes) ---
        TypeMap<CambiosDto, Cambios> dtoToEntity = modelMapper.createTypeMap(CambiosDto.class, Cambios.class);
        dtoToEntity.addMappings(mapper -> {
            mapper.using(idToEmpleadoConverter).map(CambiosDto::getIdSolicitante, Cambios::setIdSolicitante);
            mapper.using(idToEmpleadoConverter).map(CambiosDto::getIdConcede, Cambios::setIdConcede);
            mapper.using(stringToEstado).map(CambiosDto::getEstado, Cambios::setEstado);
            mapper.skip(Cambios::setIdCambio);
        });

        // --- Mapeo: Cambios -> CambiosDto  ---
        TypeMap<Cambios, CambiosDto> entityToDto = modelMapper.createTypeMap(Cambios.class, CambiosDto.class);
        entityToDto.addMappings(mapper -> {
            // Solo mapea explícitamente lo que NO es estándar o necesita conversión
            mapper.using(estadoToString).map(Cambios::getEstado, CambiosDto::setEstado);

        });


        return modelMapper;
    }
}
