package io.github.alizarazot.lasllavesdetucasa;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LLMController {

  @GetMapping(value = "/make-filters", produces = MediaType.APPLICATION_JSON_VALUE)
  public String makeFilters(@RequestParam String description) {
    Client client = new Client();

    GenerateContentResponse response =
        client.models.generateContent(
            "gemini-2.5-flash",
"""
You are a JSON output machine. Your task is to analyze a user's property description and output a raw, valid JSON object containing their filters. Do not include any other text, explanations, markdown formatting (like ```json ```), or conversational elements in your response.

**Interface:**
{
  "bedroomMax": number,
  "bedroomMin": number,
  "bathroomMax": number,
  "bathroomMin": number,
  "priceMax": number,
  "priceMin": number,
  "hasParking": boolean
}

**Rules for Values:**
1.  **Minimum Values (bedroomMin, bathroomMin, priceMin):** If the user does not specify a minimum, set the value to `-1`.
2.  **Maximum Values (bedroomMax, bathroomMax, priceMax):** If the user does not specify a maximum, set the value to `0`.
3.  **Parking (hasParking):** If the user does not explicitly mention a need for parking/garage, set this to `false`. Only set to `true` if they clearly state they need it.

**Process:**
1.  Read the user's description.
2.  Extract and infer the relevant numerical ranges and parking requirement.
3.  Apply the rules above for any unspecified values.
4.  Output only the final JSON object.

User's Description:
"""
                + description,
            null);

    return response.text();
  }
}
