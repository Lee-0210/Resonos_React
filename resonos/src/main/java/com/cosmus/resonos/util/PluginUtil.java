package com.cosmus.resonos.util;


import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

public class PluginUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static Map<String, String> parseConfig(String configJson) {
        try {
            return objectMapper.readValue(configJson, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("config_json 파싱 실패: " + e.getMessage());
        }
    }
}
