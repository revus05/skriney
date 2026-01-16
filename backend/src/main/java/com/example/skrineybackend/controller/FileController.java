package com.example.skrineybackend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.skrineybackend.dto.file.UploadFileResponseDTO;
import com.example.skrineybackend.dto.response.Response;
import com.example.skrineybackend.swagger.file.UploadFileOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/files")
@Tag(name = "Файлы", description = "Управление загрузкой файлов")
public class FileController {

  private final Cloudinary cloudinary;

  @Autowired
  public FileController(Cloudinary cloudinary) {
    this.cloudinary = cloudinary;
  }

  @UploadFileOperation
  @PostMapping("/upload")
  public Response uploadFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new Response("Файл пустой", HttpStatus.BAD_REQUEST);
    }

    try {
      Map<String, Object> options = ObjectUtils.asMap(
              "folder", "skriny",
              "resource_type", "auto",
              "overwrite", true,
              "use_filename", true,
              "unique_filename", true
      );

      Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

      String secureUrl = (String) uploadResult.get("secure_url");

      UploadFileResponseDTO dto = new UploadFileResponseDTO(secureUrl);

      return new Response("Файл успешно загружен в Cloudinary", HttpStatus.OK, dto);

    } catch (IOException e) {
      return new Response("Ошибка при чтении файла: " + e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new Response("Ошибка Cloudinary: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}