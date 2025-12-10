package io.github.alizarazot.lasllavesdetucasa;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import io.github.alizarazot.lasllavesdetucasa.RealState;


@RestController
public class RealStateController {
    @GetMapping("/real-states")
    public ArrayList<RealState> realState() {
        return RealStateController.getSampleProperties();
    }

    public static ArrayList<RealState> getSampleProperties() {
        ArrayList<RealState> properties = new ArrayList<>();
        
        properties.add(new RealState(
            1L,
            "Acogedora casa en zona residencial",
            "Amplia casa con jardín y terraza, ideal para familias. Recientemente renovada.",
            250000L,
            3,
            2,
            true,
            "Calle Primavera 123, Ciudad Jardín",
            null
        ));
        
        properties.add(new RealState(
            2L,
            "Moderno apartamento céntrico",
            "Piso completamente amueblado cerca de transporte público y centros comerciales.",
            180000L,
            2,
            1,
            false,
            "Avenida Central 456, Centro Metropolitano",
            null
        ));
        
        properties.add(new RealState(
            3L,
            "Villa de lujo con piscina",
            "Exclusiva propiedad con vistas al mar, acabados de alta gama y seguridad 24h.",
            850000L,
            5,
            4,
            true,
            "Bulevar Costero 789, Zona Premium",
            null
        ));
        
        properties.add(new RealState(
            4L,
            "Estudio económico para estudiantes",
            "Pequeño pero funcional, incluye todos los servicios básicos. Perfecto para universitarios.",
            95000L,
            1,
            1,
            false,
            "Calle Universitaria 321, Distrito Estudiantil",
            null
        ));
        
        properties.add(new RealState(
            5L,
            "Casa rural con terreno",
            "Propiedad rústica con 2 hectáreas de terreno, ideal para proyectos agrícolas o turísticos.",
            320000L,
            4,
            3,
            true,
            "Camino Rural Km 5, Valle Verde",
            null
        ));
        
        properties.add(new RealState(
            6L,
            "Loft industrial en zona trendy",
            "Espacio abierto con detalles industriales, excelente iluminación natural y techos altos.",
            295000L,
            1,
            1,
            true,
            "Calle Factory 101, Barrio Moderno",
            null
        ));
        
        return properties;
    }
}
