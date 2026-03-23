package com.example.tecknest.service;


import com.example.tecknest.dto.ProductDTO;
import com.example.tecknest.entity.Product;
import com.example.tecknest.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductDTO> getFiltered(String category, String brand,
                                        Double minPrice, Double maxPrice,
                                        Pageable pageable) {
        return productRepository
                .findWithFilters(category, brand, minPrice, maxPrice, pageable)
                .map(this::toDTO);
    }

    public ProductDTO findById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return toDTO(p);
    }

    public ProductDTO save(ProductDTO dto) {
        Product p = toEntity(dto);
        return toDTO(productRepository.save(p));
    }

    public ProductDTO update(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        existing.setName(dto.getName());
        existing.setBrand(dto.getBrand());
        existing.setCategory(dto.getCategory());
        existing.setPrice(dto.getPrice());
        existing.setDescription(dto.getDescription());
        existing.setImageUrl(dto.getImageUrl());
        existing.setStock(dto.getStock());
        existing.setRating(dto.getRating());
        return toDTO(productRepository.save(existing));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    // ── Mappers ──
    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setBrand(p.getBrand());
        dto.setCategory(p.getCategory());
        dto.setPrice(p.getPrice());
        dto.setDescription(p.getDescription());
        dto.setImageUrl(p.getImageUrl());
        dto.setStock(p.getStock());
        dto.setRating(p.getRating());
        return dto;
    }

    private Product toEntity(ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setBrand(dto.getBrand());
        p.setCategory(dto.getCategory());
        p.setPrice(dto.getPrice());
        p.setDescription(dto.getDescription());
        p.setImageUrl(dto.getImageUrl());
        p.setStock(dto.getStock());
        p.setRating(dto.getRating());
        return p;
    }
}