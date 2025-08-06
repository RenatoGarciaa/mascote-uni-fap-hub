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

    try {
      const payload = new FormData();
      payload.append("nome", formData.nome);
      payload.append("curso", formData.curso);
      payload.append("matricula", formData.matricula);
      payload.append("turno", formData.turno);
      payload.append("telefone", formData.telefone);
      payload.append("email", formData.email);
      payload.append("nomeMascote", formData.nomeMascote);
      payload.append("justificativa", formData.justificativa);
      payload.append("concordoTermos", formData.concordoTermos ? "true" : "false");
      payload.append("declaroOriginalidade", formData.declaroOriginalidade ? "true" : "false");

      if (formData.arquivo) {
        payload.append("arquivo", formData.arquivo);
      }

      const webhookURL = "https://seu-webhook-url.com";

      const response = await fetch(webhookURL, {
        method: "POST",
        body: payload
      });

      if (response.ok) {
        toast({
          title: "Inscrição enviada com sucesso! 🎉",
          description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
        });
      } else {
        throw new Error("Erro ao enviar para o webhook");
      }
    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Houve um problema ao enviar seus dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
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
    // ... (restante do JSX permanece inalterado)
  );
};

export default MascotForm;
