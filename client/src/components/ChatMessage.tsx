import Avatar from '@mui/material/Avatar';

export function ChatMessageReciever() {

    return (
        
            <div class="flex flex-row text-left">

                <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />

                <div id="toast-message-cta" class="max-w-xs p-1 m-1 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">

                    <div class="mx-3 text-sm font-normal">
                        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">APCA</span>
                        <div class="mb-2 text-sm font-normal">Olá, em que podemos ajudar?</div> 
                    </div>
    
                </div>
            </div>            
    );
}

export function ChatMessageSender() {

    return (

        <div class="flex flex-row-reverse text-right">
           
            <Avatar alt="Tozé Folhas" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />

            <div id="toast-message-cta" class="max-w-xs p-1 m-1 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">

                <div class="mx-3 text-sm font-normal">
                    <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Você</span>
                    <div class="mb-2 text-sm font-normal">Preciso de informações. Qual a morada da loja? E o seu contacto?</div> 
                </div>
                
            </div>
        </div>
    );
}


