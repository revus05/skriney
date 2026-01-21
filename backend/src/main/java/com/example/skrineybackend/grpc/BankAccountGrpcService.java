package com.example.skrineybackend.grpc;

import com.example.grpc.BankAccount;
import com.example.grpc.BankAccountServiceGrpc;
import com.example.grpc.GetBankAccountsRequest;
import com.example.grpc.GetBankAccountsResponse;
import com.example.skrineybackend.entity.User;
import com.example.skrineybackend.service.BankAccountService;
import com.example.skrineybackend.service.UserService;
import com.example.skrineybackend.utils.MoneyConverter;
import io.grpc.stub.StreamObserver;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
public class BankAccountGrpcService extends BankAccountServiceGrpc.BankAccountServiceImplBase {

  private final UserService userService;
  private final BankAccountService bankAccountService;

  @Override
  public void getBankAccounts(
      GetBankAccountsRequest request, StreamObserver<GetBankAccountsResponse> responseObserver) {
    User user = userService.getUserByTelegramId(request.getTelegramId());

    List<BankAccount> bankAccounts =
        bankAccountService.getAllBankAccounts(user.getUuid()).stream()
            .map(
                dto ->
                {
                  BankAccount.Builder builder = BankAccount.newBuilder()
                    .setUuid(dto.getUuid())
                    .setBalance(MoneyConverter.toCents(dto.getBalanceInUsd()))
                    .setTitle(dto.getTitle())
                    .setCreatedAt(String.valueOf(dto.getCreatedAt()))
                    .setUpdatedAt(String.valueOf(dto.getUpdatedAt()));

                  if (dto.getEmoji() != null) {
                    builder.setEmoji(dto.getEmoji());
                  }

                  return builder.build();
                })
            .toList();

    GetBankAccountsResponse response =
        GetBankAccountsResponse.newBuilder()
            .setStatus(true)
            .addAllBankAccounts(bankAccounts)
            .build();

    responseObserver.onNext(response);
    responseObserver.onCompleted();
  }
}
