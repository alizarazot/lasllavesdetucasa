package io.github.alizarazot.lasllavesdetucasa;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import com.google.genai.types.ThinkingConfig;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LLMController {

  @GetMapping(value = "/make-filters", produces = MediaType.APPLICATION_JSON_VALUE)
  public String makeFilters(@RequestParam String description) {
    System.out.println("Called Filter: " + description);

    Client client = new Client();

    GenerateContentConfig config =
        GenerateContentConfig.builder()
            .temperature(0.37f)
            .thinkingConfig(ThinkingConfig.builder().thinkingBudget(0).build())
            .systemInstruction(
                Content.fromParts(
                    Part.fromText(
"""
Eres un asistente que convierte descripciones de propiedades en filtros JSON. Tu respuesta debe ser ÚNICAMENTE un objeto JSON válido, sin texto adicional, sin marcas de código (nada de ```json o ```), sin explicaciones.

INTERFAZ REQUERIDA para el JSON:
{
  "bedroomMax": número,
  "bedroomMin": número,
  "bathroomMax": número,
  "bathroomMin": número,
  "priceMax": número,
  "priceMin": número,
  "hasParking": booleano
}

REGLAS DE INTERPRETACIÓN:

1. Si el usuario dice una cantidad EXACTA, usa ese mismo número para Max y Min:
   - Ejemplo: "3 habitaciones" → bedroomMax: 3, bedroomMin: 3

   2. Si el usuario dice un RANGO, usa los valores correspondientes:
   - Ejemplo: "2-3 dormitorios" → bedroomMin: 2, bedroomMax: 3
   - Ejemplo: "entre 800 y 1200" → priceMin: 800, priceMax: 1200
   - Ejemplo: "presupuesto de 1000" → priceMax: 1000, priceMin: 0

3. Para valores NO ESPECIFICADOS:
   - Campos Min (bedroomMin, bathroomMin, priceMin): si no se menciona, usa -1
   - Campos Max (bedroomMax, bathroomMax, priceMax): si no se menciona, usa 0
   - hasParking: SOLO true si menciona explícitamente parking/garaje/cochera que desea guardar un auto o algo similar. Si no lo menciona, es false.

EJEMPLOS DE RESPUESTA:

Descripción: "Busco apartamento de 2 habitaciones, 1 baño, máximo 1500€"
Respuesta: {"bedroomMax":2,"bedroomMin":2,"bathroomMax":1,"bathroomMin":1,"priceMax":1500,"priceMin":0,"hasParking":false}

Descripción: "Quiero casa con 3-4 dormitorios, 2 baños, para guardar el carro"
Respuesta: {"bedroomMax":4,"bedroomMin":3,"bathroomMax":2,"bathroomMin":2,"priceMax":0,"priceMin":-1,"hasParking":true}

Descripción: "Necesito algo barato, con al menos 1 baño"
Respuesta: {"bedroomMax":0,"bedroomMin":-1,"bathroomMax":0,"bathroomMin":1,"priceMax":0,"priceMin":-1,"hasParking":false}

Descripción: "Que cueste máximo 300k"
Respuesta: {"bedroomMax":0,"bedroomMin":-1,"bathroomMax":0,"bathroomMin":-1,"priceMax":300000,"priceMin":-1,"hasParking":false}
""")))
            .build();

    GenerateContentResponse response =
        client.models.generateContent("gemini-flash-lite-latest", description, config);

    return response.text();
  }
}
