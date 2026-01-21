package com.example.skrineybackend.grpc;

import com.example.grpc.CreateTransactionRequest;
import com.example.grpc.CreateTransactionResponse;
import com.example.grpc.TransactionServiceGrpc;
import com.example.skrineybackend.applicationservice.BankAccountApplicationService;
import com.example.skrineybackend.applicationservice.TransactionApplicationService;
import com.example.skrineybackend.dto.bankaccount.BankAccountDTO;
import com.example.skrineybackend.dto.transaction.CreateTransactionRequestDTO;
import com.example.skrineybackend.dto.transaction.TransactionDTO;
import com.example.skrineybackend.entity.User;
import com.example.skrineybackend.enums.Currency;
import com.example.skrineybackend.service.UserService;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

import java.math.BigDecimal;

@GrpcService
@RequiredArgsConstructor
public class TransactionGrpcService extends TransactionServiceGrpc.TransactionServiceImplBase {

  private final UserService userService;
  private final TransactionApplicationService transactionApplicationService;
  private final BankAccountApplicationService bankAccountApplicationService;

  @Override
  public void createTransaction(
      CreateTransactionRequest request,
      StreamObserver<CreateTransactionResponse> responseObserver) {
    User user = userService.getUserByTelegramId(request.getTelegramId());

    CreateTransactionRequestDTO dto =
        new CreateTransactionRequestDTO(
            new BigDecimal(request.getAmount() / 100),
            request.hasCurrency()
                ? Currency.valueOf(request.getCurrency())
                : user.getSettings().getDefaultCurrency(),
            request.hasDescription() ? request.getDescription() : null,
            request.hasBankAccountUuid()
                ? request.getBankAccountUuid()
                : user.getSettings().getDefaultBankAccount().getUuid(),
            request.hasCategoryUuid()
                ? request.getCategoryUuid()
                : user.getSettings().getDefaultCategory().getUuid());

    TransactionDTO transaction =
        transactionApplicationService.createTransaction(dto, user.getUuid());

    BankAccountDTO bankAccount =
        bankAccountApplicationService.getOneBankAccount(user.getUuid(), transaction.getBankAccountUuid());

    CreateTransactionResponse.Builder builder =
            CreateTransactionResponse.newBuilder()
                    .setTransactionUuid(transaction.getUuid())
                    .setAmount(transaction.getAmount().doubleValue())
                    .setCurrency(transaction.getCurrency().name())
                    .setCategoryTitle(transaction.getCategory().getTitle())
                    .setCategoryUuid(transaction.getCategory().getUuid())
                    .setBankAccountTitle(bankAccount.getTitle())
                    .setBankAccountUuid(bankAccount.getUuid())
                    .setBankAccountBalanceInUsd(bankAccount.getBalanceInUsd().doubleValue());

    if (transaction.getCategory().getEmoji() != null) {
      builder.setCategoryEmoji(transaction.getCategory().getEmoji());
    }

    if (bankAccount.getEmoji() != null) {
      builder.setBankAccountEmoji(bankAccount.getEmoji());
    }

    CreateTransactionResponse response = builder.build();

    responseObserver.onNext(response);
    responseObserver.onCompleted();
  }
}
