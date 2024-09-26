package com.sjprogramming.restapi.controller;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

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

import com.sjprogramming.restapi.model.Classe;
import com.sjprogramming.restapi.model.Demande;
import com.sjprogramming.restapi.model.Eleve;
import com.sjprogramming.restapi.model.Groupe;
import com.sjprogramming.restapi.model.ResourceNotFoundException;
import com.sjprogramming.restapi.repository.ClasseRepository;
import com.sjprogramming.restapi.repository.DemandeRepository;
import com.sjprogramming.restapi.repository.EleveRepository;
import com.sjprogramming.restapi.repository.GroupeRepository;

@RestController
@RequestMapping("/api/eleves")
public class EleveController {
    private static final Logger logger = Logger.getLogger(EleveController.class.getName());

    @Autowired
    private EleveRepository eleveRepository;
    @Autowired
    private DemandeRepository demandeRepository;
    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private GroupeRepository groupeRepository;

    @GetMapping
    public List<Eleve> getAllEleves() {
        return eleveRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eleve> getEleveById(@PathVariable Long id) {
        Eleve eleve = eleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + id));
        return ResponseEntity.ok(eleve);
    }

    @PostMapping
    public Eleve createEleve(@RequestBody Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Eleve> updateEleve(@PathVariable Long id, @RequestBody Eleve eleveDetails) {
        Eleve eleve = eleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + id));

        eleve.setCin(eleveDetails.getCin());
        eleve.setMdp(eleveDetails.getMdp());
        eleve.setFirstName(eleveDetails.getFirstName());
        eleve.setLastName(eleveDetails.getLastName());
        eleve.setEmail(eleveDetails.getEmail());
        eleve.setDateOfBirth(eleveDetails.getDateOfBirth());
        eleve.setClasse(eleveDetails.getClasse());
        eleve.setGroupe(eleveDetails.getGroupe());

        Eleve updatedEleve = eleveRepository.save(eleve);
        return ResponseEntity.ok(updatedEleve);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        Eleve eleve = eleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + id));

        eleveRepository.delete(eleve);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{eleveId}/classe/{classeId}")
    public ResponseEntity<Eleve> assignClasseToEleve(@PathVariable Long eleveId, @PathVariable Long classeId) {
        Eleve eleve = eleveRepository.findById(eleveId)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + eleveId));

        Classe classe = classeRepository.findById(classeId)
                .orElseThrow(() -> new ResourceNotFoundException("Classe not found with id: " + classeId));

        eleve.setClasse(classe);
        Eleve updatedEleve = eleveRepository.save(eleve);
        return ResponseEntity.ok(updatedEleve);
    }
    

    @PutMapping("/{eleveId}/groupe/{groupeId}")
    public ResponseEntity<Eleve> assignGroupeToEleve(@PathVariable Long eleveId, @PathVariable Long groupeId) {
        Eleve eleve = eleveRepository.findById(eleveId)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + eleveId));

        Groupe groupe = groupeRepository.findById(groupeId)
                .orElseThrow(() -> new ResourceNotFoundException("Groupe not found with id: " + groupeId));

        eleve.setGroupe(groupe);
        Eleve updatedEleve = eleveRepository.save(eleve);
        return ResponseEntity.ok(updatedEleve);
    }
    @PostMapping("/login")
    public ResponseEntity<Eleve> login(@RequestBody Map<String, String> loginData) {
        String cin = loginData.get("cin");
        String password = loginData.get("password");
        logger.info("Login attempt with CIN: " + cin + ", Password: " + password);

        Optional<Eleve> optionalEleve = eleveRepository.findByCinAndMdp(cin, password);
        if (optionalEleve.isPresent()) {
            logger.info("Login successful for CIN: " + cin);
            return ResponseEntity.ok(optionalEleve.get());
        } else {
            logger.warning("Invalid CIN or password for CIN: " + cin);
            throw new ResourceNotFoundException("Invalid CIN or password");
        }
    }
    @GetMapping("/{id}/demandes")
    public ResponseEntity<List<Demande>> getDemandesByEleveId(@PathVariable Long id) {
        Eleve eleve = eleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id: " + id));
        List<Demande> demandes = demandeRepository.findByEleveId(eleve.getId());
        return ResponseEntity.ok(demandes);
    }

}
