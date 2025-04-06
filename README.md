# Mini CRM WhatsApp

Mini sistema de CRM com atendimento via WhatsApp, desenvolvido com foco em estudo prático das tecnologias ASP.NET Core, Node.js e React.

## Tecnologias utilizadas

- **Backend (API REST)**: ASP.NET Core + SQLite
- **Microserviço WhatsApp**: Node.js + Venom-Bot
- **Frontend (Painel de Atendimento)**: React + TypeScript

## Estrutura do projeto

/mini-crm-whatsapp 
    ├── backend-aspnet → API principal em ASP.NET Core 
    ├── whatsapp-bot → Microserviço em Node.js com venom-bot 
    └── frontend-react → Painel administrativo em React

## Funcionalidades principais

- Login de atendentes com JWT
- Visualização e distribuição de conversas recebidas do WhatsApp
- Atendimento exclusivo por atendente (após "pegar" a conversa)
- Histórico de mensagens
- Integração em tempo real com WhatsApp via bot

## Status

Projeto em desenvolvimento inicial — funcionalidades estão sendo construídas passo a passo.

---

> Este projeto tem como objetivo o aprendizado e consolidação prática de arquitetura de sistemas, microserviços e integrações com mensageria real-time.
