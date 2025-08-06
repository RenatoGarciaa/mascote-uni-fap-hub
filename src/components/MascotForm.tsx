import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const MascotForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    curso: "",
    matricula: "",
    turno: "",
    telefone: "",
    email: "",
    nomeMascote: "",
    arquivo: null as File | null,
    justificativa: "",
    concordoTermos: false,
    declaroOriginalidade: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "nome",
      "curso",
      "matricula",
      "turno",
      "telefone",
      "email",
      "nomeMascote",
      "arquivo",
      "justificativa",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.concordoTermos || !formData.declaroOriginalidade) {
      toast({
        title: "Declarações obrigatórias",
        description: "Por favor, marque todas as declarações obrigatórias.",
        variant: "destructive",
      });
      return;
    }

    const webhookURL = "https://seu-webhook-url.com"; // Substitua pela sua URL

    const formPayload = new FormData();
    formPayload.append("nome", formData.nome);
    formPayload.append("curso", formData.curso);
    formPayload.append("matricula", formData.matricula);
    formPayload.append("turno", formData.turno);
    formPayload.append("telefone", formData.telefone);
    formPayload.append("email", formData.email);
    formPayload.append("nomeMascote", formData.nomeMascote);
    formPayload.append("justificativa", formData.justificativa);
    formPayload.append("concordoTermos", String(formData.concordoTermos));
    formPayload.append("declaroOriginalidade", String(formData.declaroOriginalidade));
    if (formData.arquivo) {
      formPayload.append("arquivo", formData.arquivo);
    }

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        toast({
          title: "Inscrição enviada com sucesso! 🎉",
          description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
        });
      } else {
        toast({
          title: "Erro no envio",
          description: "Houve um problema ao enviar sua inscrição. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      toast({
        title: "Erro inesperado",
        description: "Não foi possível enviar sua inscrição. Verifique sua conexão ou tente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes("png") && !file.type.includes("pdf")) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PNG ou PDF.",
          variant: "destructive",
        });
        return;
      }
      setFormData({ ...formData, arquivo: file });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nome completo"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
      />
      <Input
        placeholder="Curso"
        value={formData.curso}
        onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
      />
      <Input
        placeholder="Matrícula"
        value={formData.matricula}
        onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
      />
      <Input
        placeholder="Turno"
        value={formData.turno}
        onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
      />
      <Input
        placeholder="Telefone (WhatsApp)"
        value={formData.telefone}
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
      />
      <Input
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        placeholder="Nome do Mascote"
        value={formData.nomeMascote}
        onChange={(e) => setFormData({ ...formData, nomeMascote: e.target.value })}
      />
      <Textarea
        placeholder="Justificativa da proposta"
        value={formData.justificativa}
        onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
      />
      <Label>Arquivo (.png ou .pdf)</Label>
      <Input type="file" accept=".png,.pdf" onChange={handleFileChange} />

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formData.concordoTermos}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, concordoTermos: Boolean(checked) })
          }
        />
        <Label>Concordo com os termos do concurso</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formData.declaroOriginalidade}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, declaroOriginalidade: Boolean(checked) })
          }
        />
        <Label>Declaro que a proposta é original</Label>
      </div>

      <div className="text-center pt-8">
        <Button
          type="submit"
          className="bg-unifap-orange hover:bg-unifap-orange/90 text-white font-semibold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-0"
        >
          ✈️ Enviar informações
        </Button>
      </div>
    </form>
  );
};

export default MascotForm;
