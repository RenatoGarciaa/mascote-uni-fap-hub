import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      'nome', 'curso', 'matricula', 'turno', 'telefone', 'email', 
      'nomeMascote', 'arquivo', 'justificativa'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
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

    const webhookURL = "https://seu-webhook-url.com"; // ✅ Substitua pela sua URL

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
      if (!file.type.includes('png') && !file.type.includes('pdf')) {
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
    // ... resto do componente permanece inalterado
  );
};

export default MascotForm;
