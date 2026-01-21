package com.example.skrineybackend.grpc;

import com.example.grpc.ConnectTelegramRequest;
import com.example.grpc.ConnectTelegramResponse;
import com.example.grpc.TelegramServiceGrpc;
import com.example.skrineybackend.exception.TelegramAlreadyLinkedException;
import com.example.skrineybackend.service.UserService;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
public class TelegramGrpcService extends TelegramServiceGrpc.TelegramServiceImplBase {

  private final UserService userService;

  @Override
  public void connectTelegram(
      ConnectTelegramRequest request, StreamObserver<ConnectTelegramResponse> responseObserver) {
    ConnectTelegramResponse response;

    try {
      String username = userService.connectTelegram(request.getTelegramId(), request.getUserUuid());
      response = ConnectTelegramResponse.newBuilder().setSuccess(true).setUsername(username).build();
    } catch (TelegramAlreadyLinkedException e) {
      response = ConnectTelegramResponse.newBuilder().setSuccess(false).setUsername(e.getMessage()).build();
    }

    responseObserver.onNext(response);
    responseObserver.onCompleted();
  }
}
