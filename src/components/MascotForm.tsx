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
      const webhookUrl = "https://seu-webhook-url.com"; // 🔁 Substitua pela URL real

      const data = new FormData();
      data.append("nome", formData.nome);
      data.append("curso", formData.curso);
      data.append("matricula", formData.matricula);
      data.append("turno", formData.turno);
      data.append("telefone", formData.telefone);
      data.append("email", formData.email);
      data.append("nomeMascote", formData.nomeMascote);
      data.append("justificativa", formData.justificativa);
      data.append("arquivo", formData.arquivo as File);
      data.append("concordoTermos", String(formData.concordoTermos));
      data.append("declaroOriginalidade", String(formData.declaroOriginalidade));

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar para o webhook");
      }

      toast({
        title: "Inscrição enviada com sucesso! 🎉",
        description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
      });

      // Resetar o formulário
      setFormData({
        nome: "",
        curso: "",
        matricula: "",
        turno: "",
        telefone: "",
        email: "",
        nomeMascote: "",
        arquivo: null,
        justificativa: "",
        concordoTermos: false,
        declaroOriginalidade: false,
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar inscrição",
        description: "Houve um problema ao enviar os dados. Tente novamente.",
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

  // ... (todo o restante do JSX do formulário permanece exatamente como você já enviou)

  return (
    // JSX completo do formulário (sem alterações além do handleSubmit acima)
    // Mantenha aqui a mesma estrutura do seu código anterior
  );
};

export default MascotForm;
