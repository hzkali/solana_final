use anchor_lang::prelude::*;
pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("J5yzCZrNZJR6K5FUwwZ2SzjTvg8DzomcYqcaZJm27Y6v");

#[program]
pub mod hzkali_airsol {
    use super::*;

    pub fn initialize_user(
        ctx: Context<InitializeUser>
    ) -> Result<()> {
        // Initialize user profile with default data
  
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.last_airsol = 0;
        user_profile.airsol_count = 0;

        Ok(())
    }

    pub fn add_airsol(
        ctx: Context<AddAirsol>, 
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let airsol_account = &mut ctx.accounts.airsol_account;
        let user_profile = &mut ctx.accounts.user_profile;

        // Fill contents with argument
        airsol_account.authority = ctx.accounts.authority.key();
        airsol_account.idx = user_profile.last_airsol;
        airsol_account.location = location;
        airsol_account.country = country;
        airsol_account.price = price;
        airsol_account.image = img;
        airsol_account.isReserved = false;

        // Increase airsol idx for PDA
        user_profile.last_airsol = user_profile.last_airsol
            .checked_add(1)
            .unwrap();

        // Increase total airsol count
        user_profile.airsol_count = user_profile.airsol_count
            .checked_add(1)
            .unwrap();

        Ok(())
    }

    pub fn update_airsol(
        ctx: Context<UpdateAirsol>, 
        airsol_idx: u8,
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let airsol_account = &mut ctx.accounts.airsol_account;

        // Mark todo
        airsol_account.location = location;
        airsol_account.country = country;
        airsol_account.price = price;
        airsol_account.image = img;
        Ok(())
    }

    pub fn remove_airsol(ctx: Context<RemoveAirsol>, _airsol_idx: u8) -> Result<()> {
        // Decreate total airsol count
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.airsol_count = user_profile.airsol_count
            .checked_sub(1)
            .unwrap();

        // No need to decrease last airsol idx

        // Todo PDA already closed in context

        Ok(())
    }

    // Need a function that reserves an Airsol
    pub fn book_airsol(
        ctx: Context<BookAirsol>,
        idx: u8,
        date: String,
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let booking_account = &mut ctx.accounts.booking_account;
        
        // // Fill contents with argument
        booking_account.authority = ctx.accounts.authority.key();
        booking_account.idx = idx;
        booking_account.date = date;
        booking_account.location = location;
        booking_account.country = country;
        booking_account.price = price;
        booking_account.image = img;
        booking_account.isReserved = true;

        
        Ok(())
    }

    pub fn cancel_booking(ctx: Context<CancelBook>, _booking_idx: u8) -> Result<()> {
        // Decreate total airsol count
        let user_profile = &mut ctx.accounts.user_profile;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddAirsol<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [AIRSOL_TAG, authority.key().as_ref(), &[user_profile.last_airsol]],
        bump,
        payer = authority,
        space = 2865 + 8,
    )]
    pub airsol_account: Box<Account<'info, AirsolAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(airsol_idx: u8)]
pub struct UpdateAirsol<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [AIRSOL_TAG, authority.key().as_ref(), &[airsol_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub airsol_account: Box<Account<'info, AirsolAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(airsol_idx: u8)]
pub struct RemoveAirsol<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
 
    #[account(
        mut,
        close = authority,
        seeds = [AIRSOL_TAG, authority.key().as_ref(), &[airsol_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub airsol_account: Box<Account<'info, AirsolAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// #[instruction()]
// pub struct BookAirsol<'info> {
//     #[account(
//         mut,
//         seeds = [USER_TAG, authority.key().as_ref()],
//         bump,
//         has_one = authority,
//     )]
//     pub user_profile: Box<Account<'info, UserProfile>>,

//     #[account(
//         init,
//         seeds = [BOOK_TAG, airsol_account.key().as_ref()],
//         bump,
//         payer = booking_authority,
//         space = 3125 + 8,
//     )]
//     pub booking_account: Box<Account<'info, BookingAccount>>,

//     #[account(mut)]
//     pub authority: Signer<'info>,

//     pub system_program: Program<'info, System>,
// }

#[derive(Accounts)]
#[instruction()]
pub struct BookAirsol<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    
    #[account(
        init,
        seeds = [BOOK_TAG, authority.key().as_ref() ],
        bump,
        payer = authority,
        space = 3125 + 8,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelBook<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
 
    #[account(
        mut,
        close = authority,
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
