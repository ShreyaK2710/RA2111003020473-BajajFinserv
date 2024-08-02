package com.bajaj.bajajfinserv;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bfhl")
public class BfhlController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> processData(@RequestBody Map<String, List<String>> request) {
        List<String> data = request.get("data");
        List<String> numbers = data.stream().filter(item -> item.matches("\\d+")).collect(Collectors.toList());
        List<String> alphabets = data.stream().filter(item -> item.matches("[a-zA-Z]")).collect(Collectors.toList());
        String highestAlphabet = alphabets.stream().max(String::compareToIgnoreCase).orElse("");


        Map<String, Object> response = new LinkedHashMap<>();
        response.put("is_success", true);
        response.put("user_id", "shreya_k_02082024");
        response.put("email", "shreyak2703@gmail.com");
        response.put("roll_number", "RA2111003020473");
        response.put("numbers", numbers);
        response.put("alphabets", alphabets);
        response.put("highest_alphabet", highestAlphabet.isEmpty() ? Collections.emptyList() : Collections.singletonList(highestAlphabet));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, Integer>> getOperationCode() {
        Map<String, Integer> response = new HashMap<>();
        response.put("operation_code", 1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}