package com.lumiere.backend.controller;

import com.lumiere.backend.model.JournalPost;
import com.lumiere.backend.repository.JournalPostRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    private final JournalPostRepository journalPostRepository;

    public JournalController(JournalPostRepository journalPostRepository) {
        this.journalPostRepository = journalPostRepository;
    }

    @GetMapping
    public List<JournalPost> getAllPosts() {
        return journalPostRepository.findAll();
    }

    @GetMapping("/{id}")
    public JournalPost getPostById(@PathVariable Long id) {
        return journalPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal post not found with id: " + id));
    }
}
