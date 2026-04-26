using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Service.Dto;
using Service.Interfaces;
using Service.Services;

namespace WebApi.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IServiceMessage messageService;

        public ChatHub(IServiceMessage messageService)
        {
            this.messageService = messageService;
        }

        public async Task JoinServiceCallGroup(int serviceCallId)
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                $"serviceCall-{serviceCallId}"
            );
        }

        public async Task SendMessage(MessageDto message)
        {
            var savedMessage = await messageService.Add(message);

            await Clients
                .Group($"serviceCall-{message.ServiceCallId}")
                .SendAsync("ReceiveMessage", savedMessage);
        }
    }
}