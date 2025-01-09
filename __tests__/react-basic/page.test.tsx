import Post from "@/app/react-basic/components/Post";
import { usePost } from "@/app/react-basic/hooks/usePost";
import PageReactBasic from "@/app/react-basic/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

jest.mock("../../src/app/react-basic/hooks/usePost");

describe("react-basic: Page", () => {
   beforeEach(() => jest.clearAllMocks());

   describe("Deve renderizar o page corretamente", () => {
      it.todo("Deve renderizar o PersistQueryClientProvider com children, queryClient e persistOpotions");

      it("Deve renderizar os paragrafos", () => {
         render(<PageReactBasic />);

         expect(
            screen.getByText(/As you visit the posts below, you will notice them in a loading state/)
         ).toBeInTheDocument();

         expect(screen.getByText(/(You may need to throttle your network speed to simulate longer loading sequences)/));
      });

      it("Deve renderizar os Posts caso o postID seja -1", () => {
         render(<PageReactBasic />);
         expect(screen.getByTestId("posts-list")).toBeInTheDocument();
      });

      it("Deve renderizar o Post caso o postID seja maior que -1", () => {
         jest.spyOn(React, "useState").mockImplementationOnce(() => [1, jest.fn()]);

         render(<PageReactBasic />);

         waitFor(() => {
            expect(screen.getByTestId("posts-list")).toBeInTheDocument();
         });
      });
   });

   describe("Post", () => {
      const mockPostResponse = {
         status: "fullied",
         data: {
            title: "title",
            body: "body",
         },
         error: {},
         isFetching: false,
      };

      const mockSetPostID = jest.fn();

      it("Deve renderizar o link de voltar corretamente", () => {
         (usePost as jest.Mock).mockReturnValueOnce(mockPostResponse);

         render(<Post postID={7} setPostID={mockSetPostID} />);

         const link = screen.getByRole("link");

         fireEvent.click(link);

         expect(link).toHaveAttribute("href", "#");
         expect(link).toHaveTextContent("Back");
         expect(mockSetPostID).toHaveBeenCalledWith(-1);
      });

      it("Deve renderizar a mensagem de Loading enquanto busca os dados.", () => {
         (usePost as jest.Mock).mockReturnValueOnce({ ...mockPostResponse, status: "pending" });

         render(<Post postID={7} setPostID={mockSetPostID} />);

         expect(screen.getByText("Loading...")).toBeInTheDocument();
      });

      it("Deve renderizar a mensagem de Error quando ocorrer um erro na busca dos dados", () => {
         (usePost as jest.Mock).mockReturnValueOnce({
            ...mockPostResponse,
            status: "error",
            error: { message: "ocorreu um erro!" },
         });

         render(<Post postID={7} setPostID={mockSetPostID} />);

         expect(screen.getByText("Error: ocorreu um erro!"));
      });

      it("Deve mostrar as informações do post", () => {
         (usePost as jest.Mock).mockReturnValueOnce({ ...mockPostResponse, status: "fullied" });

         render(<Post postID={7} setPostID={mockSetPostID} />);

         expect(screen.getByRole("heading")).toBeInTheDocument();
         expect(screen.getByRole("heading")).toHaveTextContent(mockPostResponse.data.title);
         expect(screen.getByRole("paragraph")).toBeInTheDocument();
         expect(screen.getByRole("paragraph")).toHaveTextContent(mockPostResponse.data.body);
      });

      it.todo("Deve mostrar a mensagem de Background Updating enquanto atualiza os dados.");
   });

   describe("Posts", () => {
      it.todo("Deve mostrar o titulo da seção");

      it.todo("Deve mostrar a mensgaem de Loading enquanto busca os dados.");

      it.todo("Deve mostrar a mensagem de Error quando ocorrer um erro na busca dos dados.");

      it.todo("Deve retornar a lista de posts corretamente");

      it.todo("Deve mostrar a mensagem de Background Updating enquanto atualiza os dados.");
   });

   it.skip("Deve renderizar a frase de chamada", () => {
      throw [
         "Proximos passos",
         "Criar a interface com dados constantes (fixtures e mocks) e manter a barra verde.",
         "Substituir os dados constantes por variaveis (valores reais mockados) caminhando para a barra continuar verde.",
         "Revisar e remover duplicações e fazer melhorias pontuais no código.",
         "Analisar e planejar os proximos passos, criar as suites de testes e todos, rever o que foi aprendido e treinar comunicação para apresentar e explicar o que foi feito.",
         "publicar o código, fazer possiveis ajustes da codereview, verificar se a pipeline rodou, se o novo código foi publicado na homologação e atualizar/organizar os status das tarefas do jira.",
         "Iniciar pausa de 30 min para começar a proxima sessão de outra tarefa (virar a chavinha).",
      ];
   });
});