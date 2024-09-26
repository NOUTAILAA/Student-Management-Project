package com.sjprogramming.restapi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjprogramming.restapi.model.Demande;
import com.sjprogramming.restapi.repository.DemandeRepository;

@RestController
@RequestMapping("/api/demandes")
public class DemandeController {

    @Autowired
    private DemandeRepository demandeRepository;

    @GetMapping
    public List<Demande> getAllDemandes() {
        return demandeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable Long id) {
        Optional<Demande> demande = demandeRepository.findById(id);
        if (demande.isPresent()) {
            return ResponseEntity.ok(demande.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Demande createDemande(@RequestBody Demande demande) {
        return demandeRepository.save(demande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Demande> updateDemande(@PathVariable Long id, @RequestBody Demande demandeDetails) {
        Demande demande = demandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Demande not found"));

        demande.setSujet(demandeDetails.getSujet());
        demande.setDescription(demandeDetails.getDescription());
        demande.setDateCreation(demandeDetails.getDateCreation());
        demande.setCauseRefus(demandeDetails.getCauseRefus());

        Demande updatedDemande = demandeRepository.save(demande);
        return ResponseEntity.ok(updatedDemande);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<Demande> updateStateToAccepted(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Demande not found"));

        demande.setState("Acceptée");

        Demande updatedDemande = demandeRepository.save(demande);
        return ResponseEntity.ok(updatedDemande);
    }

    @PutMapping("/{id}/refus")
    public ResponseEntity<Demande> updateStateToRefused(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        Demande demande = demandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Demande not found"));

        String causeRefus = requestBody.get("causeRefus");
        demande.setState("Refusée");
        demande.setCauseRefus(causeRefus);

        Demande updatedDemande = demandeRepository.save(demande);
        return ResponseEntity.ok(updatedDemande);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemande(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Demande not found"));
        demandeRepository.delete(demande);
        return ResponseEntity.noContent().build();
    }
}
