import random

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.attack = 10
        self.defense = 5
        self.inventory = ['health potion', 'energy drink', 'shield', 'space grenade']

    def take_damage(self, damage):
        """Reduce player's health, ensuring it doesn't go below zero."""
        self.health -= max(0, damage - self.defense)

    def attack_enemy(self, enemy):
        """Player attacks the enemy."""
        damage = random.randint(1, self.attack)
        enemy.take_damage(damage)
        print(f"{self.name} attacks {enemy.name} for {damage} damage.")

    def use_item(self, item):
        """Use item from inventory."""
        if item in self.inventory:
            if item == 'health potion':
                self.health += random.randint(10, 20)
                print(f"{self.name} uses a health potion and restores health.")
                self.inventory.remove('health potion')
            elif item == 'energy drink':
                self.health += random.randint(5, 10)
                print(f"{self.name} uses an energy drink and restores health.")
                self.inventory.remove('energy drink')
            elif item == 'shield':
                self.defense += 2
                print(f"{self.name} uses a shield and increases defense.")
                self.inventory.remove('shield')
            # Add more item effects
        else:
            print("Item not available.")

    def check_inventory(self):
        """Check player's inventory."""
        print(f"{self.name}'s Inventory:")
        for item in self.inventory:
            print("- " + item)

class Enemy:
    def __init__(self, name):
        self.name = name
        self.health = 50
        self.attack = 8
        self.defense = 2

    def take_damage(self, damage):
        """Reduce enemy's health."""
        self.health -= damage

    def attack_player(self, player):
        """Enemy attacks the player."""
        damage = random.randint(1, self.attack)
        player.take_damage(damage)
        print(f"{self.name} attacks {player.name} for {damage} damage.")

def main():
    player_name = input("Enter your name: ")
    player = Player(player_name)
    enemy = Enemy("Alien Invader")

    while player.health > 0 and enemy.health > 0:
        action = input("Enter your action (attack/item/check): ").lower()
        if action == 'attack':
            player.attack_enemy(enemy)
        elif action == 'item':
            if player.inventory:
                item_to_use = random.choice(player.inventory)
                player.use_item(item_to_use)
            else:
                print("No items left in inventory.")
        elif action == 'check':
            player.check_inventory()
        else:
            print("Invalid action.")

        enemy.attack_player(player)

    if player.health <= 0:
        print("Game over. You lost!")
    else:
        print("Congratulations! You defeated the enemy.")

if __name__ == "__main__":
    main()
