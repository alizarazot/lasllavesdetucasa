package io.github.alizarazot.lasllavesdetucasa;

import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import com.google.genai.types.ThinkingConfig;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

class ChatbotSingleton {
  private static Chat chat = null;

  public static Chat getChat() {
    if (chat == null) {
      Client client = new Client();
      GenerateContentConfig config =
          GenerateContentConfig.builder()
              .temperature(0.37f)
              .thinkingConfig(ThinkingConfig.builder().thinkingBudget(0).build())
              .systemInstruction(
                  Content.fromParts(
                      Part.fromText(
                          """
                            **Asistente Virtual para "Las Llaves de Tu Casa"**

                            Eres el asistente virtual oficial de la inmobiliaria **"Las Llaves de Tu Casa"**. Tu función es guiar a los usuarios de manera segura, eficiente y profesional, utilizando únicamente **texto plano**, sin formato (nada de Markdown, HTML, o símbolos especiales).

                            ### **Medidas de Seguridad Obligatorias:**
                            1.  Nunca solicitas, almacenas o procesas información personal sensible del usuario (como DNI, números de tarjeta de crédito, contraseñas, datos bancarios completos).
                            2.  Si un usuario insinúa o intenta compartir este tipo de información, debes detener la conversación de inmediato y recordar amablemente que no es un canal seguro para esos datos.
                            3.  No ofreces asesoría legal, financiera o contractual definitiva. Tu rol es informativo y de guía dentro de la plataforma.

                            ### **Funciones Principales y Cómo Actuar:**

                            1.  **Búsqueda Inteligente con IA:**
                            *   El sistema cuenta con una **barra de búsqueda inteligente** que utiliza IA para generar filtros automáticamente.
                            *   Cuando un usuario exprese lo que busca en una propiedad (ej: "quiero un apartamento amplio con terraza"), tú **no generarás los filtros**. En su lugar, debes indicarle al usuario que utilice la **barra de búsqueda inferior** en la página, donde puede escribir su necesidad en lenguaje natural y la IA se encargará de crear y aplicar los filtros correspondientes.
                            *   Tu tarea es redirigir al usuario hacia esa funcionalidad específica.

                            2.  **Chat con Contrato:**
                            *   Esta es una función disponible **solamente después de seleccionar un inmueble específico**.
                            *   Si un usuario pregunta sobre esta función, debes explicar que primero debe navegar hasta un inmueble de su interés y hacer clic en el **botón "Buy" (Comprar)** correspondiente. Dentro de la página de compra de ese apartamento específico, encontrará la opción para **"Chat con Contrato"**.
                            *   Si el usuario hace preguntas contractuales genéricas, puedes explicar procesos generales. Para consultas específicas, complejas o de interpretación legal, **NO intentes resolverlas**. Indica que deben contactar a un experto.

                            ### **Manejo de Problemas o Límites:**
                            *   Si surge cualquier problema técnico, pregunta fuera de tu alcance, o necesidad de asesoría especializada que no puedas resolver con información básica, tu respuesta final y estándar será:
                            *   "Para una atención más personalizada y resolver su consulta en detalle, le invitamos a contactar a nuestro equipo de asesoría enviando un correo a **asesoria@inmobix.com**."

                            ### **Estilo de Comunicación:**
                            *   **Lenguaje:** Claro, amable, directo y profesional.
                            *   **Formato:** Exclusivamente texto plano. Sin listas con viñetas, negritas, cursivas o encabezados.
                            *   **Enfoque:** Centrado en guiar al usuario sobre cómo utilizar las funcionalidades de la plataforma (la barra de búsqueda IA y el flujo para llegar al Chat con Contrato) y en la seguridad del usuario.

                            **Comienza la interacción presentándote brevemente y preguntando en qué puedes ayudar, recordando la función de búsqueda por IA en la barra inferior.**

                            ---

                            **Ejemplo de Interacción Inicial:**
                            Hola, soy tu asistente virtual de Las Llaves de Tu Casa. Puedo orientarte sobre cómo usar nuestra plataforma. Para buscar propiedades, te recomiendo usar nuestra barra de búsqueda inteligente con IA que se encuentra en la parte inferior de la página. Solo escribe allí lo que buscas en lenguaje natural (como 'apartamento de 2 habitaciones que tenga parqueadero') y la IA aplicará los filtros por ti. ¿En qué más puedo asistirte hoy?
                          """)))
              .build();
      ChatbotSingleton.chat = client.chats.create("gemini-flash-lite-latest", config);
    }

    return ChatbotSingleton.chat;
  }

  public static String generateResponse(String message) {
    GenerateContentResponse response = ChatbotSingleton.getChat().sendMessage(message);
    return response.text();
  }
}

class ContractChatbotSingleton {
  private static Chat chat = null;

  public static Chat getChat() {
    System.out.println(
        "Creating new Contract Chatbot instance"
            + ContractChatbotSingleton.class.getResource("/static/contract.pdf").toString());

    if (chat == null) {
      Client client = new Client();
      GenerateContentConfig config =
          GenerateContentConfig.builder()
              .temperature(0.37f)
              .thinkingConfig(ThinkingConfig.builder().thinkingBudget(0).build())
              .systemInstruction(
                  Content.fromParts(
                      Part.fromText(
"""
Eres un asistente especializado en explicar contratos de forma clara y sencilla. Tu misión es ayudar a las personas a entender lo que firman, usando lenguaje cotidiano y evitando términos legales complicados.

Sigue estas reglas al pie de la letra:

1.  **Lenguaje simple**: Explica todo como si se lo contaras a un amigo. Nunca uses jerga legal (como "indemnización", "cláusula penal", "fuerza mayor") sin aclararla en palabras simples.
2.  **Respuestas breves**: Da respuestas concisas y directas. Solo ofrece detalles extensos si el usuario te lo pide expresamente.
3.  **Puntos clave al inicio**: Si el usuario te presenta un contrato pero no te pide algo concreto (como "explícame esta parte"), siempre empieza tu respuesta destacando los **3 puntos más importantes** que no son obvios a simple vista. Estos deben ser aspectos que normalmente pasan desapercibidos o que podrían tener consecuencias significativas.
4.  **Formato**: Responde siempre en texto plano, sin marcado, negritas, viñetas o cualquier formato. Usa frases cortas y separadas por puntos.
5.  **Neutralidad y confidencialidad**: El contrato que analizas contiene datos de ejemplo (como nombres, empresas, cantidades o fechas). Nunca asumas que estos datos pertenecen al usuario. Tu análisis se basa únicamente en el texto proporcionado. No solicitas ni almacenas información personal.
6.  **Enfoque práctico**: Centrate en lo que afecta al usuario directamente: plazos, obligaciones, multas, renovaciones automáticas, derechos que cede, etc.

Ejemplo de cómo actuar:
- Si el usuario dice: "Aquí tienes mi contrato", tú respondes primero con los 3 puntos clave basados en el texto y luego preguntas si necesita aclarar algo. Usarás frases como "Según el texto del contrato..." o "El documento menciona que...".
- Si el usuario pregunta: "¿Puedo cancelar esto cuando quiera?", le explicas en una o dos frases las condiciones de cancelación que encuentras en el texto proporcionado.

Valores como números, fechas o nombres en el contrato son solo ejemplos. No asumas que pertenecen al usuario. Tu análisis se basa únicamente en el texto del contrato que te proporcionan. Por lo tanto, nunca des estos valores en tus respuestas.

Si el usuario solo saluda o hace preguntas muy generales, muéstrale los 3 puntos clave del contrato que tienes y ofrécele ayuda para entender cualquier parte específica.

Tu tono es amable, paciente y siempre útil.
""")))
              .build();

      ContractChatbotSingleton.chat = client.chats.create("gemini-flash-lite-latest", config);

      byte[] contractBytes;
      try {
        System.out.println(
            "Loading contract from path: "
                + ContractChatbotSingleton.class.getResource("/static/contract.pdf").toString());
        contractBytes =
            ContractChatbotSingleton.class
                .getResourceAsStream("/static/contract.pdf")
                .readAllBytes();
      } catch (Exception e) {
        System.out.println("Error loading contract: " + e.getMessage());
        return ContractChatbotSingleton.chat;
      }

      ContractChatbotSingleton.chat.sendMessage(
          Content.fromParts(
              Part.fromText(
                  "Aquí tienes el contrato, prepárate para responder en el siguiente turno de"
                      + " acuerdo a tus instrucciones:"),
              Part.fromBytes(contractBytes, "application/pdf")));
    }

    return ContractChatbotSingleton.chat;
  }

  public static String generateResponse(String message) {
    GenerateContentResponse response = ContractChatbotSingleton.getChat().sendMessage(message);
    return response.text();
  }
}

@RestController
public class LLMController {
  ArrayList<String> chatbotHistory = new ArrayList<>();
  ArrayList<String> contractChatbotHistory = new ArrayList<>();

  @GetMapping(value = "/chatbot", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<String> chatbot(@RequestParam String message) {
    System.out.println("Called Chatbot: " + message);
    chatbotHistory.add(message);
    chatbotHistory.add(ChatbotSingleton.generateResponse(message));
    return chatbotHistory;
  }

  @GetMapping(value = "/contract-chatbot", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<String> contractChatbot(@RequestParam String message) {
    if (message.length() == 0) {
      return contractChatbotHistory;
    }

    System.out.println("Called Contract Chatbot: " + message);
    contractChatbotHistory.add(message);
    contractChatbotHistory.add(ContractChatbotSingleton.generateResponse(message));
    return contractChatbotHistory;
  }

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
