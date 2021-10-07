import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

import faker from "faker";

type SutTpes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTpes => {
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    return {
        sut,
        httpPostClientSpy
    }
}

describe("RemoteAuthentication", () => {
    it("should call HttpClient with correct URL", async () => {
        const url = faker.internet.url();
        const { sut, httpPostClientSpy } = makeSut(url);
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    });
    
    it("should call HttpClient with correct body", async () => {
        const { sut, httpPostClientSpy } = makeSut();
        const authenticationParams = mockAuthentication();
        await sut.auth(authenticationParams);
        expect(httpPostClientSpy.body).toEqual(authenticationParams);
    });

    it("should throw invalidCredentialsError if HttpClient return 401", async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = { statusCode: HttpStatusCode.unathorized };
        const promise = sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    it("should throw UnexpectedError if HttpClient return 400", async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = { statusCode: HttpStatusCode.badRequest };
        const promise = sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it("should throw UnexpectedError if HttpClient return 500", async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = { statusCode: HttpStatusCode.serverError };
        const promise = sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it("should throw UnexpectedError if HttpClient return 404", async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = { statusCode: HttpStatusCode.notFound };
        const promise = sut.auth(mockAuthentication());
        expect(promise).rejects.toThrow(new UnexpectedError());
    });
});