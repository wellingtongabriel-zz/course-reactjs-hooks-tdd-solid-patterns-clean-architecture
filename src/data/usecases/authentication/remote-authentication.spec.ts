import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";
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
        await sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    })  
})